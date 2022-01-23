import { ReactElement, useEffect, useState } from "react";

type Props<T> = {
  promise: Promise<T>;
  pending: ReactElement;
  error: (error: any) => ReactElement;
  success: (data: T) => ReactElement;
};

function Await<T>({
  promise,
  pending: Loading,
  error: renderError,
  success: renderSuccess,
}: Props<T>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T>(null);

  useEffect(() => {
    promise
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return Loading;
  if (error) return renderError(error);
  return renderSuccess(data);
}

export default Await;
