import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

/** Redirect URL lama ke halaman cart */
function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const meja = searchParams.get('meja');
    navigate(meja ? `/cart?meja=${meja}` : '/cart', { replace: true });
  }, [searchParams, navigate]);

  return null;
}

export default OrderSuccess;
