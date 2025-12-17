
const Footer = () => {
  return (
    <footer className=" w-full py-5 border-t border-zinc-800 bg-zinc-950 text-center text-zinc-400">
        <p className="text-xs max-w-screen-sm mx-auto px-4 break-words">
          &copy; {new Date().getFullYear()} PerfCV. All rights reserved.
        </p>
    </footer>
  )
}

export default Footer