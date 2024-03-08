interface HandleErrorProps {
  error: any;
  setError: (value: boolean) => void;
  setMsgError: (message: string) => void;
}

const handleApiErrors = (
  error: any,
  setError: HandleErrorProps['setError'],
  setMsgError: HandleErrorProps['setMsgError'],
): void => {
  setError(true);
  setMsgError(
    error.response?.data?.mensagem ||
      'Ocorreu uma perda de pacotes na sua conexão. Recomendamos utilizar uma conexão de internet mais estável.',
  );
};
export default handleApiErrors;
