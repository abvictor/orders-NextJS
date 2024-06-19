import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'

import {GetServerSideProps} from 'next'

import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import logoImg from '../../public/logo.png'
import styles from '@/styles/home.module.scss'
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGuest";




export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)
  


  async function handleLogin(e: FormEvent){
    e.preventDefault();


    if(email === '' || password == ''){
      toast.error("Senha ou usário não informados")
      return;
    }
    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
   <>
    <Head>
      <title>Pizza - Faça seu login</title>
    </Head>

    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo da aplicação"/>

      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu e-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Digite sua senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={loading} onClick={handleLogin}>Acessar</Button>
        </form>
        <Link href="/signup" className={styles.text}>
            Cadastrar-se
        </Link>
      </div>
    </div>
   </>
  );  
}


export const getServerSideProps = canSSRGuest(async (context) => {
  
  return {
    props: {}
  }
})