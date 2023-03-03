import NextHead from "next/head";

export default function Head({ title = "" }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""} Dynasty
      </title>
      <link rel="icon" href="/icons8-diamond-ring-16.ico" />
    </NextHead>
  );
}
