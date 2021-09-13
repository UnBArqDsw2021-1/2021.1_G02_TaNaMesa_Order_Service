import database from "../db";

const create = async (request, response) => {
  try {
    const fieldsToValidate = ['status', 'idTable', 'idClient', 'nameClient'];
    for (let field of fieldsToValidate) {
      if (!request.body.order[field]) {
        return response.status(400).json({
          success: false,
          message: `O campo ${field} é obrigatório`
        });
      }
    }
    return response.json({
      success: true,
      order: await database.order.create(request.body.order)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    });
  }
}

const getAll = async (request, response) => {
  try {
    let filters = {}
    if (request.query.category)
      filters.category = request.query.category

    return response.json({
      success: true,
      orders: await database.order.findAll({
        where: {
          ...filters
        }
      })
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
      order: await database.order.findByPk(request.params.id)
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
    await database.order.update(request.body.order, { where: { idOrder: request.params.id } })
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
    await database.order.destroy({ where: { idOrder: request.params.id } })
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