import type { Metadata } from "next";
import Image from "next/image";
import collage from "@images/collage.png";

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutPage() {
  return (
    <div className="mt-12 sm:mt-6">
      <section>
        <h1 className="text-3xl text-primary text-center">About Me</h1>
        <div className="text-secondary">
          <p className="mt-4">
            My name is Gil Hanan and I&apos;m a web developer at Microsoft with
            over 10 years of experience 👨‍💻. <br /> Programming is my passion,
            and I discovered it when I developed bots to play games for me and
            level up my characters. I&apos;m not sure if that&apos;s cheating or
            genius 🤖, but it was a lot of fun 🥳.
          </p>
          <p className="mt-4">
            Although I have a romance with ChatGPT, I&apos;m happily married 💍.
            In my spare time, I like to build wooden items 🔨🪵 and play ball
            games ⚽️🏀, but I hate running 🏃‍♂️. <br /> I love animals more than
            humans, and our home is somewhat of a zoo 🐶🐱🦜🐇.
          </p>
          <p className="mt-4">
            Recently, I&apos;ve taken an interest in building open-source
            projects, and I created this portfolio website to showcase them 🖼️.
            <br /> I hope you enjoy them, and I would appreciate any feedback
            📨.
          </p>
        </div>
        <Image
          src={collage}
          alt="My family"
          priority
          className="m-4 ml-0 rounded-md shadow-md w-[100%] sm:w-[300px]"
        />
      </section>
    </div>
  );
}
