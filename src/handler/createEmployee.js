
'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createEmployee = (event, context, callback) => {

    const data = JSON.parse(event.body);

    if( typeof data.idade !== 'number' ) {
        console.error('Campo Idade inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Idade inválida !" })
        }

        return;
    }

    if( typeof data.nome !== 'string' ) {
        console.error('Campo Nome inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Nome inválido !" })
        }

        return;
    }

    if( typeof data.cargo !== 'string' ) {
        console.error('Campo Cargo inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Cargo inválido !" })
        }

        return;
    }

    const params = {
        TableName: 'employees',
        Item: {
            id: uuid.v1(),
            nome: data.nome,
            cargo: data.cargo,
            idade: data.idade,
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}