import { FormEvent, useState, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";


import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/contexts/AuthContext";

import logoImg from '../../../public/logo.svg'
import styles from '@/styles/home.module.scss'
import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)


  async function handleSignUp(e:FormEvent){
    e.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.warning("Todos os campos são necessários")
      return;
    }

    setLoading(true);

    let data = {
      email,
      name,
      password
    }
    await signUp(data)
    toast.success("Criado com sucesso")
    setLoading(false)
  }


  return (
   <>
    <Head>
      <title>Pizza - Faça seu cadastro</title>
    </Head>

    <div className={styles.containerCenter}>

      <Image src={logoImg} alt="Logo da aplicação"/>

      <div className={styles.login}>
      <h1>Criando sua conta</h1>
        <form onSubmit={handleSignUp}>
          <Input placeholder="Digite seu nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Digite seu e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={loading}>Cadastrar</Button>
        </form>
        <Link href="/" className={styles.text}>Voltar para o login</Link>
      </div>
    </div>
   </>
  );  
}