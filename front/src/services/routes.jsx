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
      const formData = new FormData(),
        valueTitle = `${productData.dbNewPdf.valueTitle} ${productData.dbNewPdf.valueSizeTitle} ${productData.dbNewPdf.valueStyleTextTitle} ${productData.dbNewPdf.valueFontFamilyTitle}`,
        valueBody = `${productData.dbNewPdf.valueBody} ${productData.dbNewPdf.valueSizeBody} ${productData.dbNewPdf.valueStyleTextBody} ${productData.dbNewPdf.valueFontFamilyBody}`,
        valueFirmas = `${productData.dbNewPdf.valueFirmas} ${productData.dbNewPdf.valueSizeFirmas} ${productData.dbNewPdf.valueStyleTextFirmas} ${productData.dbNewPdf.valueFontFamilyFirmas}`,
        valueLocation = `${productData.dbNewPdf.valueLocation} ${productData.dbNewPdf.valueSizeLocation} ${productData.dbNewPdf.valueStyleTextLocation} ${productData.dbNewPdf.valueFontFamilyLocation}`,
        valueImg = `${productData.dbNewPdf.valueImg} ${productData.dbNewPdf.valueSizeImg}`


      formData.append('title', productData.dbNewPdf.title)
      formData.append('body', productData.dbNewPdf.body)
      formData.append('numFirmas', productData.dbNewPdf.numFirmas)
      formData.append('imgUrl', productData.dbNewPdf.urlImg)
      formData.append('firma', productData.dbNewPdf.firma)
      formData.append('access', productData.dbNewPdf.access)
      formData.append('idaccess', productData.dbNewPdf.idaccess)
      formData.append('team', productData.dbNewPdf.team)
      formData.append('valueTitle', valueTitle)
      formData.append('valueImg', valueImg)
      formData.append('valueBody', valueBody)
      formData.append('valueFirmas', valueFirmas)
      formData.append('valueLocation', valueLocation)
       
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