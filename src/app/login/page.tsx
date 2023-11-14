'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { BackendApiPost } from '@/backendApi';
import styles from '@/styles/Login.module.css';
import Cookies from 'js-cookie';
import { Loader } from '@/components/shared';

interface FormState {
  email: string;
  password: string;
}

interface WarningState {
  msg: string;
  show: boolean;
}

export default function SignIn(): JSX.Element {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [warning, setWarning] = useState<WarningState>({
    msg: '',
    show: false,
  });

  const updateForm = (key: string, value: string) => {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const saveUserToLocalStorage = (user: any) => {
    localStorage.setItem('userNome', user.nome);
    localStorage.setItem('escola', user.id_ee);
    localStorage.setItem('auth_token', user.token);
    localStorage.setItem('userId', user.id);
    Cookies.set('auth_token', user.token);
  };

  const handleLoginError = (error: any) => {
    setWarning({
      msg: error.response.data.mensagem,
      show: true,
    });
    setLoaded(false);
    hideWarningAfterDelay();
  };

  const hideWarningAfterDelay = () => {
    setTimeout(() => {
      setWarning(() => ({
        msg: '',
        show: false,
      }));
    }, 6000);
  };

  const handleSignIn = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const backendApi = new BackendApiPost();

      const users = await backendApi.userLogin({
        email: form.email,
        senha: form.password,
      });
      console.log(users[0].token);
      setLoaded(true);
      saveUserToLocalStorage(users[0]);
      router.push('/');
    } catch (error: any) {
      handleLoginError(error);
    }
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const key = evt.target.name;
    updateForm(key, value);
  };

  return (
    <div className={styles.containerFundo}>
      <div className={styles.logoContainer}>
        <img src="logo_be_2.png" className={styles.logo} />
      </div>
      <form className={styles.formLogin} onSubmit={(evt) => handleSignIn(evt)}>
        <h1>Login</h1>
        <div className={styles.groupForm}>
          <label className={styles.labelLogin}>E-mail</label>
          <input
            className={styles.inputLogin}
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
          />
        </div>
        <div className={styles.groupForm}>
          <label className={styles.labelLogin}>Senha</label>
          <input
            className={styles.inputLogin}
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
        </div>
        <button className={styles.btnLogin} type="submit">
          Entrar
        </button>
        <div className={styles.boxWarning}>
          <span className={styles.error}>{warning.show && warning.msg}</span>
        </div>
      </form>
      <div className={styles.boxLoaderLogin}>{loaded ? <Loader /> : ''}</div>
    </div>
  );
}
