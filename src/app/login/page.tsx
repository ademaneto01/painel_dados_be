'use client';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import BackendApiMock from '@/backendApi';
import styles from '@/styles/Login.module.css';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Loader } from '@/components/shared';
import { useGlobalContext } from '@/context/store';

interface FormState {
  email: string;
  password: string;
}

interface WarningState {
  msg: string;
  show: boolean;
}

export function SignIn() {
  const router = useRouter();
  const { titleQuill, setTitleQuill } = useGlobalContext();
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [warning, setWarning] = useState<WarningState>({
    msg: '',
    show: false,
  });

  function onChange(evt: ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    const key = evt.target.name;

    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  }
  function hideWarningAfterDelay() {
    setTimeout(() => {
      setWarning(() => ({
        msg: '',
        show: false,
      }));
    }, 6000);
  }
  async function handleSignIn(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    try {
      const backendApi = new BackendApiMock();

      const users = await backendApi.userLogin({
        email: form.email,
        senha: form.password,
      });
      if (users[0].nome !== undefined) {
        setLoaded(true);
        localStorage.setItem('userNome', users[0].nome);
        localStorage.setItem('escola', users[0].escola);
        localStorage.setItem('auth_token', users[0].token);
        localStorage.setItem('userId', users[0].id);
        Cookies.set('auth_token', users[0].token);
        router.push('/');
      } else {
        router.push('/login');
      }
    } catch (error: any) {
      setWarning({
        msg: error.response.data.mensagem,
        show: true,
      });
      setLoaded(false);
      hideWarningAfterDelay();
    }
  }

  return (
    <div className={styles.containerSignIn}>
      <div className={styles.containerMain}>
        <form
          className={styles.formLogin}
          onSubmit={(evt) => handleSignIn(evt)}
        >
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
            {loaded ? <Loader /> : ''}
          </div>
        </form>
      </div>
      <div className={styles.containerFundo}>
        <Image
          src="/logo-be-vazado.png"
          alt={'logo-login'}
          width={200}
          height={200}
          priority={true}
        />
      </div>
    </div>
  );
}
export default SignIn;
