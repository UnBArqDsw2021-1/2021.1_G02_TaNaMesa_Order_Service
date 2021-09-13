import database from "../db";

const create = async (request, response) => {
  try {
    if (!request.body.client.name) return response.status(400).json({
      success: false,
      message: 'O campo nome é obrigatório'
    })
    return response.json({
      success: true,
      client: await database.client.create(request.body.client)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const getAll = async (request, response) => {
  try {
    return response.json({
      success: true,
      clients: await database.client.findAll()
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const getOne = async (request, response) => {
  try {
    return response.json({
      success: true,
      client: await database.client.findByPk(request.params.id)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const edit = async (request, response) => {
  try {
    await database.client.update(request.body.client, { where: { idClient: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

const destroy = async (request, response) => {
  try {
    await database.client.destroy({ where: { idClient: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
}

export default { create, getAll, getOne, edit, destroy }