import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { forceUpdate } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('accessToken', token);
      
      if (forceUpdate) {
        forceUpdate();
      }
      
      setTimeout(() => {
        window.location.href = '/templates';
      }, 100);
    } else {
      navigate('/auth/login?error=oauth_failed');
    }
  }, [searchParams, navigate, forceUpdate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
    </div>
  );
};

export default OAuthCallback;
