// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';
import { Fbc } from '../frontend/fbchat/Fbc';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Fbc />
    </div>
  );
}
