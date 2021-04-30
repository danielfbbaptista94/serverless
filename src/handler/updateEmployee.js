
'use strict'

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateEmployee = (event, context, callback) => {

    const data = JSON.parse(event.body);

    if( typeof data.nome !== 'string' ) {
        console.error('Campo Nome inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Nome inválido !" })
        }

        return;
    }

    if( typeof data.nome !== 'string' ) {
        console.error('Campo Cargo inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Cargo inválido !" })
        }

        return;
    }

    if( typeof data.idade !== 'number' ) {
        console.error('Campo Idade inválido');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"Campo Idade inválido !" })
        }

        return;
    }

    const params = {
        TableName: 'employees',
        Key: {
            id: event.pathParameters.id
        },
        ExpressionAttributeValues: {
            ':n': data.nome,
            ':c': data.cargo,
            ':i': data.idade
        },
        UpdateExpression: 'set nome = :n, cargo = :c, idade = :i'
    };

    dynamoDb.update(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}