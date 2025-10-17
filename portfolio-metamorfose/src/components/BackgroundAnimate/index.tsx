'use client';

import {  useInView, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function BackgroundEntrance({ children }: Props) {
   const ref = useRef(null);

  const estaEnVista = useInView(ref, { once: false });
  const [animar, setAnimar] = useState<boolean>(false);

  useEffect(() => {
    if (estaEnVista) {
      setAnimar(true);
    } else {
      setAnimar(false);
    }
  }, [estaEnVista]);

  return (
    <div ref={ref} className="mt-1 relative h-screen overflow-hidden mask-fade-mini ">
      {animar && (
        <>
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-zinc-900 z-0"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2 bg-zinc-900 z-0"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
