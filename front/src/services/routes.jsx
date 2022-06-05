import Axios from 'axios'
import md5 from "md5";

const baseUrl = "http://localhost:8000"

export async function getPdfPublic () {
  try {
    const response = await Axios({
      url: `${baseUrl}/v1/new`,
      method: 'GET',
      params: {
        access: 1,
        idaccess: "0",
        team: "0"
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPdfPrivate (idUser) {
  try {
    const response = await Axios({
      url: `${baseUrl}/v1/new`,
      method: 'GET',
      params: {
        idaccess: idUser,
        access: 0,
        team: "0"
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPdfTeam (nameTeam) {
  try {
    const response = await Axios({
      url: `${baseUrl}/v1/new`,
      method: 'GET',
      params: {
        team: `${nameTeam}`,
        access: 0,
        idaccess: "0"
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getTeam () {
  try {
    const response = await Axios({
      url: `${baseUrl}/v3/team`,
      method: 'GET'
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getUserTeam (name) {
  console.log(name);
  try {
    const response = await Axios({
      url: `${baseUrl}/v2/logTeam`,
      method: 'GET',
      params: {
        team: name
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function getPayRoll () {
  console.log('aqui');
  try {
    const response = await Axios.get(`http://localhost:7070/v1/new`)

    return response
  } catch (e) {
    console.log(e)
  }
}

export async function savePdf (productData) {
    try {
      const formData = new FormData()

      formData.append('title', productData.title)
      formData.append('posTitle', productData.posTitle)
      formData.append('sizeTitle', productData.sizeTitle)
      formData.append('body', productData.body)
      formData.append('posImg', productData.posImg)
      formData.append('numFirmas', productData.numFirmas)
      formData.append('sizeImg', productData.sizeImg)
      formData.append('image', productData.image)
      formData.append('firma', productData.firma)
      formData.append('access', productData.access)
      formData.append('idaccess', productData.idaccess)
      formData.append('team', productData.team)
      formData.append('valueName', productData.valueName)
      formData.append('valueNomina', productData.valueNomina)
      formData.append('valueFechaIngreso', productData.valueFechaIngreso)
      formData.append('valueFechaSalida', productData.valueFechaSalida)
      formData.append('valuePuesto', productData.valuePuesto)
      formData.append('valueFecha', productData.valueFecha)
      formData.append('date', productData.date)
      formData.append('imgX', productData.imgX)
      formData.append('imgY', productData.imgY)
      formData.append('imgW', productData.imgW)
      formData.append('imgH', productData.imgH)
      formData.append('imgScroll', productData.imgScroll)
       
      const response = await Axios({
        url: `${baseUrl}/v1/new`,
        method: 'POST',
        data: formData,
      })
  
      return response
    } catch (e) {
      console.log(e)
    }
  }

  export async function saveUser (userData) {
    try {
        
      const response = await Axios({
        url: `${baseUrl}/v2/log`,
        method: 'POST',
        params: {
              name: userData.name,
              lastname: userData.lastname,
              team: userData.team,
              username: userData.username,
              password: userData.password
          }
      })
      return response
    } catch (e) {
      console.log(e)
    }
  }

    export async function saveTeam (userData) {
      try {
        const response = await Axios({
          url: `${baseUrl}/v3/team`,
          method: 'POST',
          params: {
            name: userData.team
          },
        })
    
        return response
      } catch (e) {
        console.log(e)
      }
    }

  export async function deletePdf (id) {
    await Axios.delete(`${baseUrl}/v1/new?_id=${id}`)
    .then(function(ret){
      console.log(ret.data)
    })
  }

  export async function deleteUser (id) {
    console.log(id);
    await Axios.delete(`${baseUrl}/v2/log?id=${id}`)
    .then(function(ret){
      console.log(ret.data)
    })
  }