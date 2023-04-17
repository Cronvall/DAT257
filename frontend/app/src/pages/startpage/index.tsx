import style from "./style.module.css"


export default function HomePage() {

  return (
    <>
    <div className={style.container}>
      <h1>Super mega stock trader league</h1>

      <button className={style.button}>Join league</button>
      <button className={style.button}>Create league</button>
    </div>
    </>
  )

  
}