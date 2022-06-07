import React, { FC } from 'react';
import { motion } from 'framer-motion';

interface Props {
  delay?: number;
  numberOfChildren?: number;
}

export const Section: FC<Props> = ({ children, delay = 0, numberOfChildren = 0 }): JSX.Element => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    style={{ marginBottom: '20px', marginTop: '10px' }}
    {...numberOfChildren}
  >
    {children}
  </motion.div>
);
