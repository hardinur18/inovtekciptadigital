import dynamic from "next/dynamic";
import Head from "next/head";

const InovtekApp = dynamic(() => import("../src/App.jsx"), {
  ssr: false
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Inovtek | Website Custom, LMS, E-Commerce</title>
        <meta
          name="description"
          content="Studio pembuatan website custom, LMS, e-commerce, company profile, dan produk digital untuk bisnis yang ingin tampil rapi dan siap scale."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#031A3C" />
        <meta name="application-name" content="Inovtek" />
        <meta name="apple-mobile-web-app-title" content="Inovtek" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/assets/inovtek-app-icon.svg" />
      </Head>
      <InovtekApp />
    </>
  );
}
