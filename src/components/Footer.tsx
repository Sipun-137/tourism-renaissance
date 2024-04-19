import Link from "next/link";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
export default function Footer() {
  return (
    <>
      <footer className="footer footer-center p-10 bg-[#132566] text-primary-content " >
        <aside>
          <div>
                <code>
                    thank you
                </code>
          </div>
          <p className="font-bold">
          <Link href={"https://developersipun.vercel.app/"}>kumar sipun</Link><br />
            Developer
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link href={"https://twitter.com/kumarsipun137"}><XIcon/></Link>
            <Link href={"https://www.instagram.com/kumarsipun_137/"}><InstagramIcon/></Link>
            <Link href={"https://www.linkedin.com/in/subhranshu-pradhan-677bb3242/"}><LinkedInIcon/></Link>
            <Link href={"https://github.com/Sipun-137"}><GitHubIcon/></Link>
            <Link href={"https://developersipun.vercel.app/"}><ConnectWithoutContactIcon/></Link>
          </div>
        </nav>
      </footer>
    </>
  );
}
