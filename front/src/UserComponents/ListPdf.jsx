import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import Loader from '../HomeComponents/Loader'

const ListPdf = ({ listPdfPublic, deleteElementPublic, listPdfPrivate, listPdfTeam }) => {
  const [isPublic, setIsPublic] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)
  const [isTeam, setIsTeam] = useState(false)

  const refPublic = createRef(),
    refPrivate = createRef(),
    refTeam = createRef(),
    refListPublic = createRef(),
    refListPrivate = createRef(),
    refListTeam = createRef(),
    refBtnPublic = createRef(),
    refBtnPrivate = createRef(),
    refBtnTeam = createRef(),
    refDontPub = createRef(),
    refDontPri = createRef(),
    refDontTeam = createRef()

    let legthPub = Object.keys(listPdfPublic).length,
    legthPri =  Object.keys(listPdfPrivate).length,
    legthTeam = Object.keys(listPdfTeam).length

  const privateHTML = () => {
    if (legthPri === 0) {
      return (
        <div className="dontHave" ref={refDontPri}>
          <h1> No hay documentos</h1>
        </div>
      )
    }
    if (legthPri > 0) {
      return (
        <div className="listPdf" id="listPrivate" ref={refListPrivate}>
      
      {listPdfPrivate.map(({ title, _id }) => (
        <div>
          <div className='divList'>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs" id="btnPrivate" ref={refBtnPrivate}>
            <Link
              to={`/home/user/pdf/${listPdfPrivate.findIndex((pdfs) => pdfs._id === _id)}`}
            >
              <button className="btnIr btnRoot"> Ir </button>
            </Link>
            <button
              onClick={async () => {
                await deleteElementPublic(_id);
              }}
              className="btnDelete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
      )
    }
  }

  const publicHTML = () => {
    if (legthPub === 0) {
      return (
        <div className="dontHave is-active" ref={refDontPub}>
          <h1> No hay documentos</h1>
        </div>
      )
    }
    if (legthPub > 0) {
      console.log('public');
      return (
        <div className="listPdf is-active" id="listPublic" ref={refListPublic}>
       
      {listPdfPublic.map(({ title, _id }) => (
        <div>
          <div className='divList'>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs is-active" id="btnPublic" ref={refBtnPublic}>
            <Link
              to={`/home/user/pdf/${listPdfPublic.findIndex((pdfs) => pdfs._id === _id)}`}
            >
              <button className="btnIr btnRoot"> Ir </button>
            </Link>
            <button
              onClick={async () => {
                await deleteElementPublic(_id);
              }}
              className="btnDelete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
      )
    }
  }

  const teamHTML = () => {
    if (legthTeam === 0) {
      return (
        <div className="dontHave" ref={refDontTeam}>
          <h1> No hay documentos</h1>
        </div>
      )
    }
    if (legthTeam > 0) {
      return (
        <div className="listPdf" id="listTeam" ref={refListTeam}>
     
      {listPdfTeam.map(({ title, _id }) => (
        <div>
          <div className='divList'>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs" id="btnTeam" ref={refBtnTeam}>
            <Link
              to={`/home/user/pdf/${listPdfTeam.findIndex((pdfs) => pdfs._id === _id)}`}
            >
              <button className="btnIr btnRoot"> Ir </button>
            </Link>
            <button
              onClick={async () => {
                await deleteElementPublic(_id);
              }}
              className="btnDelete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
      )
    }
  }

  const handlerPublic = () => {
    if (isPrivate) {
      if (legthPri === 0) {
        setIsPrivate(false)
      refPrivate.current.style.backgroundColor = 'silver'
      refPrivate.current.style.color = 'black'
      refDontPri.current.classList.remove('is-active')
      }
      if (legthPri > 0) {
        setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'silver'
        refPrivate.current.style.color = 'black'
        refListPrivate.current.classList.remove('is-active')
        refBtnPrivate.current.classList.remove('is-active')
      }
    }
    if (isTeam) {
      if (legthTeam === 0) {
        setIsTeam(false)
          refTeam.current.style.backgroundColor = 'silver'
          refTeam.current.style.color = 'black'
          refDontTeam.current.classList.remove('is-active')
      }
        if (legthTeam > 0) {
          setIsTeam(false)
          refTeam.current.style.backgroundColor = 'silver'
          refTeam.current.style.color = 'black'
          refListTeam.current.classList.remove('is-active')
          refBtnTeam.current.classList.remove('is-active')
        }
    }
    
    if (legthPub === 0) {
      setIsPublic(true)
      refPublic.current.style.backgroundColor = 'cadetblue'
      refPublic.current.style.color = 'whitesmoke'
      refDontPub.current.classList.add('is-active')
    }
    if (legthPub > 0) {
      setIsPublic(true)
      refListPublic.current.classList.add('is-active')
      refBtnPublic.current.classList.add('is-active')
      refPublic.current.style.backgroundColor = 'cadetblue'
      refPublic.current.style.color = 'whitesmoke'
    }
  }

  const handlerPrivate = () => {
    if (isPublic) {
      if (legthPub === 0) {
      setIsPublic(false)
      refPublic.current.style.backgroundColor = 'silver'
      refPublic.current.style.color = 'black'
      refDontPub.current.classList.add('is-active')
      }
      if (legthPub > 0) {
        setIsPublic(false)
        refPublic.current.style.backgroundColor = 'silver'
        refPublic.current.style.color = 'black'
        refListPublic.current.classList.remove('is-active')
        refBtnPublic.current.classList.remove('is-active')
      }
    }
    if (isTeam) {
      if (legthTeam === 0) {
        setIsTeam(false)
        refTeam.current.style.backgroundColor = 'silver'
        refTeam.current.style.color = 'black'
        refDontTeam.current.classList.remove('is-active')
      }
      if (legthTeam > 0) {
        setIsTeam(false)
        refTeam.current.style.backgroundColor = 'silver'
        refTeam.current.style.color = 'black'
        refListTeam.current.classList.remove('is-active')
        refBtnTeam.current.classList.remove('is-active')
      }
    }
    if (legthPri === 0) {
      setIsPrivate(true)
      refPrivate.current.style.backgroundColor = 'cadetblue'
      refPrivate.current.style.color = 'whitesmoke'
      refDontPri.current.classList.add('is-active')
    } 
    if (legthPri > 0) {
      setIsPrivate(true)
      refListPrivate.current.classList.add('is-active')
      refBtnPrivate.current.classList.add('is-active')
      refPrivate.current.style.backgroundColor = 'cadetblue'
      refPrivate.current.style.color = 'whitesmoke'
    }
  }

  const handlerTeam = () => {
    if (isPublic) {
      if (legthPub === 0) {
      setIsPublic(false)
        refPublic.current.style.backgroundColor = 'silver'
        refPublic.current.style.color = 'black'
        refDontPub.current.classList.remove('is-active')
      }
      if (legthPub > 0) {
        setIsPublic(false)
        refPublic.current.style.backgroundColor = 'silver'
        refPublic.current.style.color = 'black'
        refListPublic.current.classList.remove('is-active')
        refBtnPublic.current.classList.remove('is-active')
      }
    }
    if (isPrivate) {
      if (legthPri === 0) {
      setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'silver'
        refPrivate.current.style.color = 'black'
        refDontPri.current.classList.remove('is-active')
    }
      if (legthPri > 0) {
        setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'silver'
        refPrivate.current.style.color = 'black'
        refListPrivate.current.classList.remove('is-active')
        refBtnPrivate.current.classList.remove('is-active')
      }
    }
    if (legthTeam === 0) {
      setIsTeam(true)
      refTeam.current.style.backgroundColor = 'cadetblue'
      refTeam.current.style.color = 'whitesmoke'
      refDontTeam.current.classList.add('is-active')
    }
    if (legthTeam > 0) {
      setIsTeam(true)
      refListTeam.current.classList.add('is-active')
      refBtnTeam.current.classList.add('is-active')
      refTeam.current.style.backgroundColor = 'cadetblue'
      refTeam.current.style.color = 'whitesmoke'
    }
  }
  
  return (
    <div>
      <div className="btnPdf">
      <button className="btnPub" ref={refPublic} onClick={async () =>  {await handlerPublic()}}>Public</button>
      <button ref={refPrivate} onClick={async () => {await handlerPrivate()}}>Private</button>
      <button ref={refTeam} onClick={async () => {await handlerTeam()}}>Team</button>
      </div>
     
    {publicHTML()}
    
    {privateHTML()}
    
    {teamHTML()}
      
    </div>
  );
};

export default ListPdf;
