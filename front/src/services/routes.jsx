import Axios from 'axios'
import md5 from "md5";

const baseUrl = "http://localhost:8000"

export async function getPdf (id) {
  try {
    const response = await Axios({
      url: `${baseUrl}/v1/newId`,
      method: 'GET',
      params: {
      id: id
    }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

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

      formData.append('title', productData.dbNewPdf.title)
      formData.append('body', productData.dbNewPdf.body)
      formData.append('access', productData.dbNewPdf.access)
      formData.append('idaccess', productData.dbNewPdf.idaccess)
      formData.append('team', productData.dbNewPdf.team)
     
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
    console.log(userData);
    try {
        
      const response = await Axios({
        url: `${baseUrl}/v2/log`,
        method: 'POST',
        params: {
              name: userData.name,
              lastname: userData.lastname,
              team: userData.team,
              username: userData.username,
              password: userData.password,
              position: userData.puesto
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

  export async function deletePdfTeam (id) {
    console.log(id);
    await Axios.delete(`${baseUrl}/v1/newTeam?_id=${id}`)
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

  export async function deleteTeam (name) {
    await Axios.delete(`${baseUrl}/v3/team?name=${name}`)
    .then(function(ret){
      console.log(ret.data)
    })
  }

  export async function deleteUserTeam (name) {
    await Axios.delete(`${baseUrl}/v2/delTeam?name=${name}`)
    .then(function(ret){
      console.log(ret.data)
    })
  }