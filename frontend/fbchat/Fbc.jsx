import { useEffect } from 'react';
import { cleanup, init } from './fb';

export function Fbc() {
  useEffect(() => {
    console.log('Facebook1');
    init();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
      <div id="fb-root"></div>

      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </div>
  );
}
