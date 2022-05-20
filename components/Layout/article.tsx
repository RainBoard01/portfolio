import React, { FC } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

interface Props {
  title: string;
}

export const Article: FC<Props> = ({ children, title }) => {
  const t = `Yerko Acuña - ${title}`;
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 20 },
  };
  return (
    <motion.article
      key={title}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <>
        {title && (
          <Head>
            <title>{t}</title>
            <meta name="twitter:title" content={t} />
            <meta property="og:title" content={t} />
          </Head>
        )}
        {children}
      </>
    </motion.article>
  );
};
