import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";

import { FiUpload } from "react-icons/fi"; 
import { canSSRAuth } from "@/utils/canSSRAuth";

import { setupAPIClient } from '../../services/api'
import { Header } from "@/components/Header";
import styles from './styles.module.scss'
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}

export default function Product( {categoryList }:CategoryProps){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('') 

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)


    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
          return;
        }
    
        const image = e.target.files[0];
    
        if(!image){
          return;
        }
    
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
    
          setImageAvatar(image);
          setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    
        }
    
      }
    

    function handleChangeCategory(e){
        setCategorySelected(e.target.value)
      }

    async function handleRegister(e: FormEvent){
        e.preventDefault();

        try{
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error('Preencha todos os campos')
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data)

            toast.success('Cadastrado com sucesso')


        }catch(error){
            toast.error('Ocorreu um erro ao cadastrar o produto')
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }
      


    return (
        <>
            <Head>
                <title>Novo produto - My orders</title>
            </Head>

            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={25} color="#FFF"/>
                        </span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                       {avatarUrl && (
                         <img 
                            className={styles.preview}
                            src={avatarUrl}
                            alt="Foto do produto"
                            width={250}
                            height={250}
                         />
                       )}

                    </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map((item, index) => (
                                 <option key={item.id} value={index}>{item.name}</option>
                            ))}
                        </select>

                        <input className={styles.input} type="text" placeholder="Digite o nome do item" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder="Digite o nome do valor" value={price} onChange={(e)=>setPrice(e.target.value)}/>

                        <textarea className={styles.input} placeholder="Descrição do produto" value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <button className={styles.buttonAdd} type="submit">Cadastrar</button>

                    </form>
                </main>
        
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/category')

    console.log(response.data)

    return {
        props: {
            categoryList: response.data
        }
    }
})