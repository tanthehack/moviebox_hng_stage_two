import { Facebook, Instagram, Twitter, Youtube } from "../../assets/icons/generatedIcons"

export const Footer = () => {
    return (
        <>
            <footer className="w-[100dvw] h-[30dvh] lg:h-[50dvh] flex flex-col items-center justify-center gap-9 text-xs font-bold text-gray-900">
                <div className="flex justify-center gap-12">
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <Youtube />
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-12 gap-4 items-center">
                    <p>Consitions of Use</p>
                    <p>Privacy & Policy</p>
                    <p>Press Room</p>
                </div>
                <p className=" text-gray-500">© 2021 MovieBox by Adriana Eka Prayudha  </p>
            </footer>
        </>
    )
}