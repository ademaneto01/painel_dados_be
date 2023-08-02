'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import BackendApiMock from '@/backendApi';
import styles from '@/styles/Login.module.css';
import Cookie from 'js-cookie';
import Image from 'next/image';
interface FormState {
  email: string;
  password: string;
}

interface WarningState {
  msg: string;
  show: boolean;
}

function SignIn() {
  const router = useRouter();
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

  async function handleSignIn(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const backendApi = new BackendApiMock();

    const users = await backendApi.userLogin({
      email: form.email,
      senha: form.password,
    });

    Cookie.set('auth_token', users[0].token);
    Cookie.set('userId', users[0].id);
    Cookie.set('perfil', users[0].perfil);
    router.push('/');
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
            <label className={styles.labelStandard}>E-mail</label>
            <input
              className={styles.inputStandard}
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className={styles.groupForm}>
            <label className={styles.labelStandard}>Senha</label>
            <input
              className={styles.inputStandard}
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <button className={styles.btnLogin} type="submit">
            Entrar
          </button>
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
