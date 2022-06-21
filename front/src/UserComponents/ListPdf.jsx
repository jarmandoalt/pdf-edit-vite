import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import Loader from '../HomeComponents/Loader'
import Cookies from "universal-cookie";

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
    refDontTeam = createRef(),
    cookies = new Cookies()

    let legthPub = Object.keys(listPdfPublic).length,
    legthPri =  Object.keys(listPdfPrivate).length,
    legthTeam = Object.keys(listPdfTeam).length

  const privateHTML = () => {
    if (legthPri === 0) {
      return (
        <div className="divDont">
          <h1 className="h1DontPriv" ref={refDontPri}> No hay plantillas</h1>
        </div>
      )
    }
    if (legthPri > 0) {
      return (
        <div className="listPdf divListPdfPriv" id="listPrivate" ref={refListPrivate}>      
      {listPdfPrivate.map(({ title, _id }) => (
        <div>
          <div>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs" id="btnPrivate" ref={refBtnPrivate}>
            <Link onClick={ () => cookies.set("pdfId", _id, { path: "/" })}
              to={`/home/user/pdf`}
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
        <div className="divDont">
          <h1 className="h1DontPub is-active" ref={refDontPub}> No hay plantillas</h1>
        </div>
      )
    }
    if (legthPub > 0) {
      console.log('public');
      return (
        <div className="listPdf divListPdfPub is-active" ref={refListPublic} id="listPublic">       
      {listPdfPublic.map(({ title, _id }) => (
        <div className=" " >
          <div className='divList'>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs is-active" id="btnPublic" ref={refBtnPublic}>
            <Link onClick={ () => cookies.set("pdfId", _id, { path: "/" })}
              to={`/home/user/pdf`}
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
        <div className="divDont">
          <h1 className="h1DontTeam" ref={refDontTeam}> No hay plantillas</h1>
        </div>
      )
    }
    if (legthTeam > 0) {
      return (
        <div className="listPdf divListPdfTeam" id="listTeam" ref={refListTeam}>     
      {listPdfTeam.map(({ title, _id }) => (
        <div>
          <div>
            <h1 className="cardPdf">{title}</h1>
          </div>
          <div className="btnPdfs" id="btnTeam" ref={refBtnTeam}>
            <Link onClick={ () => cookies.set("pdfId", _id, { path: "/" })}
              to={`/home/user/pdf`}
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
      refPrivate.current.style.backgroundColor = 'rgb(99, 118, 158)'
      refPrivate.current.style.color = 'whitesmoke'
      refDontPri.current.classList.remove('is-active')
      }
      if (legthPri > 0) {
        setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPrivate.current.style.color = 'whitesmoke'
        refListPrivate.current.classList.remove('is-active')
        refBtnPrivate.current.classList.remove('is-active')
      }
    }
    if (isTeam) {
      if (legthTeam === 0) {
        setIsTeam(false)
          refTeam.current.style.backgroundColor = 'rgb(99, 118, 158)'
          refTeam.current.style.color = 'whitesmoke'
          refDontTeam.current.classList.remove('is-active')
      }
        if (legthTeam > 0) {
          setIsTeam(false)
          refTeam.current.style.backgroundColor = 'rgb(99, 118, 158)'
          refTeam.current.style.color = 'whitesmoke'
          refListTeam.current.classList.remove('is-active')
          refBtnTeam.current.classList.remove('is-active')
        }
    }
    
    if (legthPub === 0) {
      setIsPublic(true)
      refPublic.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refPublic.current.style.color = 'whitesmoke'
      refDontPub.current.classList.add('is-active')
    }
    if (legthPub > 0) {
      setIsPublic(true)
      refListPublic.current.classList.add('is-active')
      refBtnPublic.current.classList.add('is-active')
      refPublic.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refPublic.current.style.color = 'whitesmoke'
    }
  }

  const handlerPrivate = () => {
    if (isPublic) {
      if (legthPub === 0) {
      setIsPublic(false)
      refPublic.current.style.backgroundColor = 'rgb(99, 118, 158)'
      refPublic.current.style.color = 'whitesmoke'
      refDontPub.current.classList.remove('is-active')
      }
      if (legthPub > 0) {
        setIsPublic(false)
        refPublic.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPublic.current.style.color = 'whitesmoke'
        refListPublic.current.classList.remove('is-active')
        refBtnPublic.current.classList.remove('is-active')
      }
    }
    if (isTeam) {
      if (legthTeam === 0) {
        setIsTeam(false)
        refTeam.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refTeam.current.style.color = 'whitesmoke'
        refDontTeam.current.classList.remove('is-active')
      }
      if (legthTeam > 0) {
        setIsTeam(false)
        refTeam.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refTeam.current.style.color = 'whitesmoke'
        refListTeam.current.classList.remove('is-active')
        refBtnTeam.current.classList.remove('is-active')
      }
    }
    if (legthPri === 0) {
      setIsPrivate(true)
      refPrivate.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refPrivate.current.style.color = 'whitesmoke'
      refDontPri.current.classList.add('is-active')
    } 
    if (legthPri > 0) {
      setIsPrivate(true)
      refListPrivate.current.classList.add('is-active')
      refBtnPrivate.current.classList.add('is-active')
      refPrivate.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refPrivate.current.style.color = 'whitesmoke'
    }
  }

  const handlerTeam = () => {
    if (isPublic) {
      if (legthPub === 0) {
      setIsPublic(false)
        refPublic.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPublic.current.style.color = 'whitesmoke'
        refDontPub.current.classList.remove('is-active')
      }
      if (legthPub > 0) {
        setIsPublic(false)
        refPublic.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPublic.current.style.color = 'whitesmoke'
        refListPublic.current.classList.remove('is-active')
        refBtnPublic.current.classList.remove('is-active')
      }
    }
    if (isPrivate) {
      if (legthPri === 0) {
      setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPrivate.current.style.color = 'whitesmoke'
        refDontPri.current.classList.remove('is-active')
    }
      if (legthPri > 0) {
        setIsPrivate(false)
        refPrivate.current.style.backgroundColor = 'rgb(99, 118, 158)'
        refPrivate.current.style.color = 'whitesmoke'
        refListPrivate.current.classList.remove('is-active')
        refBtnPrivate.current.classList.remove('is-active')
      }
    }
    if (legthTeam === 0) {
      setIsTeam(true)
      refTeam.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refTeam.current.style.color = 'whitesmoke'
      refDontTeam.current.classList.add('is-active')
    }
    if (legthTeam > 0) {
      setIsTeam(true)
      refListTeam.current.classList.add('is-active')
      refBtnTeam.current.classList.add('is-active')
      refTeam.current.style.backgroundColor = 'rgb(76, 91, 124)'
      refTeam.current.style.color = 'whitesmoke'
    }
  }
  
  return (
    <div>
      <div className="divBtnPdf">
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
