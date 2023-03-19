import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUserReducer } from 'features/redux/user-slice';
import { CadastroForm } from './../cad-form/cadastro';
import { usuario } from 'types';
import {setCookie} from 'nookies'

export function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [cadastroUsuario, setCadastroUsuario] = useState(false)

    const setUser = async ({ token, name }: usuario) => {
        let userFetch = await fetch('http://localhost:3000/usuario/' + name)
        let user: usuario = await userFetch.json()
        let newUser = {
            id: user.id,
            name: user.name,
            management: user.management,
            token: token
        }
        setCookie(undefined, 'auth-token', String(token), {
            maxAge: 24 * 60 * 60, // 1 day
        })
        dispatch(setUserReducer(newUser))
        router.push('/dashboard/main')
    }

    const { register, handleSubmit, formState: { errors } } = useForm<usuario>({
        defaultValues: {
            name: '',
            password: '',
            management: false
        }
    });

    const onSubmit: SubmitHandler<usuario> = (data: usuario) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(async (res) => {
                res.ok? setUser(await res.json()) : alert('Usuario ou senha incorretos')
            })
    };

    return (
        <div className={styles.loginFormContainer}>
            <header className={styles.header}>
                <Image src={logo}
                    priority
                    width={50}
                    height={50}
                    alt="Agrotech" />
                <h1>Agrotech</h1>

            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Usuario"
                    value="lcscamacho"
                    {...register('name', { required: true })} />
                {errors.name && errors.name.type === "required" && <span>Este campo é obrigatório</span>}
                <input type="password" placeholder="Senha"
                    value="123456"
                    {...register('password', { required: true, minLength: 6 })} />
                {errors.password && errors.password.type === "required" && <span>Este campo é obrigatório</span>}
                {errors.password && errors.password.type === "minLength" && <i>A senha deve ter no mínimo 6 caracteres</i>}
                <button type="submit">Entrar</button>
            </form>
            <button onClick={() => setCadastroUsuario(!cadastroUsuario)}>Registrar usuario</button>
            {cadastroUsuario && <CadastroForm modal={cadastroUsuario} onRequestClose={() => setCadastroUsuario(false)} />}
        </div>
    );
}
