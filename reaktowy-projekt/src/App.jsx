import { useEffect, useState } from 'react'
import './App.css'
import k0 from './assets/kostki/k0.svg'
import k1 from './assets/kostki/k1.svg'
import k2 from './assets/kostki/k2.svg'
import k3 from './assets/kostki/k3.svg'
import k4 from './assets/kostki/k4.svg'
import k5 from './assets/kostki/k5.svg'
import k6 from './assets/kostki/k6.svg'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [liczbaKosci, setLiczbaKosci] = useState(5);
  const [progPunktowy, setProgPunktowy] = useState(15);
  const [wygrane, setWygrane] = useState(0)
  const [przegrane, setPrzegrane] = useState(0)
  const [losowania, setLosowania] = useState(0)
  const obrazyKostek = [k0, k1, k2, k3, k4, k5, k6]

  const aktualizacjaStatystyk = (czyWygrana) => {
    if (czyWygrana) {
      setWygrane(aktualne => aktualne + 1);
    } else {
      setPrzegrane(aktualne => aktualne + 1);
    }
    setLosowania(aktualne => aktualne + 1);
  }

  const procentWygranych = losowania === 0 ? 0 : ((wygrane/losowania) * 100).toFixed(1)

  const [kostki, setKostki] = useState([]);
  useEffect(() => {
    setKostki(Array(Number(liczbaKosci)).fill(0))
  }, [liczbaKosci])

  const losuj = () => {
    let noweKostki = [];
    for (let i = 0; i < liczbaKosci; i++) {
      const wylosowana = Math.floor((Math.random() * 6) + 1)
      noweKostki.push(wylosowana)
    }
    setKostki(noweKostki)
    console.log("Alea iacta est " + noweKostki)
    policzWynik(noweKostki)
  }

  const policzWynik = (aktualneKosci) => {
    let wynik = 0
    for (const kostka of aktualneKosci) {
      wynik += Number(kostka)
    }
    if (wynik >= Number(progPunktowy)) {
      console.log(`Wynik: wygrana, punktów: ${wynik}`)
      aktualizacjaStatystyk(true)
    } else {
      console.log(`Wynik: przegrana, punktów: ${wynik}`)
      aktualizacjaStatystyk(false)
    }
  }

  const resetujStatystyki = () => {
    setWygrane(0);
    setPrzegrane(0);
    setLosowania(0);
  }

  return (
    <>
      <div className='container my-5 text-center'>
        <div className='m-5'>
          <h2 className='my-5'>Statsy</h2>
          {losowania === 0 ? (
            <p>Brak losowań</p>
            ) : (
              <>
                <p>Wygrane: <b>{wygrane}</b></p>
                <p>Przegrane: <b>{przegrane}</b></p>
                <p>Procent wygranych: <b>{procentWygranych}</b> %</p>
              </>
            )}
        </div>
        <div className='col'>
          <div className='col-12 col-md-12 col-lg-5 mx-auto'>
            <h2>Kości</h2>
            <div className='d-flex flex-wrap justify-content-center gap-3 my-5'>
              {kostki.map((kostka, index) => (
                <div key={index}>
                  <img src={obrazyKostek[kostka]} className='shadow rounded-4' style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className='btn btn-success btn-lg px-5 shadow m-5' onClick={() => losuj()}>RZUĆ</button>
            <button className='btn btn-danger btn-lg px-5 shadow m-5' onClick={() => resetujStatystyki()}>RESET</button>
          </div>
        </div>
        <div className='col my-5'>
            <form className='form'>
              <input type="number" min="1" className="form-control my-2" name="liczbaKosci" value={liczbaKosci} onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10)
                setLiczbaKosci(Number.isNaN(n) ? 1 : Math.max(1, n))
              }}/>
              <input type="number" min="1" className="form-control my-2" name="progPunktowy" value={progPunktowy} onChange={(e) => setProgPunktowy(Math.max(1, parseInt(e.target.value)))}/>
            </form>
        </div>
      </div>
    </>
  )
}

export default App
