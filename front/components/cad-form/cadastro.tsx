import styles from './cadastro.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import Modal from 'react-modal';


type usuario = {
    name: string;
    password: string;
    confirmPassword?: string;
    management?: boolean;
}

interface CadastroFormProps {
    modal: boolean;
    onRequestClose: () => void;
}

export function CadastroForm({modal, onRequestClose}: CadastroFormProps) {


    const { register, handleSubmit, formState: { errors } } = useForm<usuario>({
        defaultValues: {
            name: '',
            password: '',
            management: false
        }
    });


    const onSubmit: SubmitHandler<usuario> = async (data: usuario) => {
        if (data.password !== data.confirmPassword) {
            alert('As senhas não conferem')
            return
        }
        let usuarioCadastrado:usuario = {
            name: data.name,
            password: data.password,
            management: false
        }
        await fetch('http://localhost:3000/usuario', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioCadastrado)
        })
        .then( () => {
            alert('Usuario cadastrado com sucesso')
            onRequestClose()
        })
        .catch(err => console.log(err))
    };


    return (
            <Modal
            isOpen={modal}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            overlayClassName={styles.modalOverlay}
            className={styles.modal}
            ariaHideApp={false}
        >
        <div className={styles.CadastroFormContainer}>
            <header className={styles.header}>
                <Image src={logo}
                    width={50}
                    height={50}
                    alt="Agrotech" />
                <h1>Agrotech - Cadastro de Usúario</h1>

            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Usuario"
                    {...register('name', { required: true })} />
                {errors.name && errors.name.type === "required" && <span>Este campo é obrigatório</span>}
                <input type="password" placeholder="Senha"
                    {...register('password', { required: true, minLength: 6 })} />
                {errors.password && errors.password.type === "required" && <span>Este campo é obrigatório</span>}
                {errors.password && errors.password.type === "minLength" && <i>A senha deve ter no mínimo 6 caracteres</i>}
                <input type="password" placeholder="Confirme sua senha"
                    {...register('confirmPassword', { required: true, minLength: 6 })} />
                {errors.confirmPassword && errors.confirmPassword.type === "required" && <span>Este campo é obrigatório</span>}
                {errors.confirmPassword && errors.confirmPassword.type === "minLength" && <i>A senha deve ter no mínimo 6 caracteres</i>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
        </Modal>
    );
}
