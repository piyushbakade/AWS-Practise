const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');
const { stringify } = require('uuid');
const expect = require('chai').expect;
//const testdata=require('./testcase');
const list=require('../src/handlers/createBook')

//const responseCode=require('../functions/index')

describe('the module', () => {
    it('should mock getItem from DynamoDB', async () => {
      AWSMock.setSDKInstance(AWS);
     
      
      // Mocking DynamoDB.getItem()
      AWSMock.mock('DynamoDB', 'getItem', (params, callback) => {
        console.log('DynamoDB', 'getItem', 'mock called')
        
        callback(null,testdata.response);
        
      
      });
      
      let input = { TableName: 'Books', Key: {id} };
      
      // When calling AWS.DynamoDB node.js will use the mocked object
      const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
      
      const result = await dynamodb.getItem(input).promise();
     try{
           const getpost=require('../src/handlers/createBook')
     }catch{

     }
      
      expect(result).to.eql(testdata.response);
      console.log(result);
  
      AWSMock.restore('DynamoDB');
      
    });
    it('should mock putItem to DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);
       
        
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'putItem', (params, callback) => {
          console.log('DynamoDB', 'putItem', 'mock called')
          
          callback(null,{ message: 'Post created successfully' });
          
        
        });
        
        let input = { TableName: 'Books', Item: {}}
            
        
        // When calling AWS.DynamoDB node.js will use the mocked object
        const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        
        const result = await dynamodb.putItem(input).promise();
        expect(result).to.eql({ message: 'Post created successfully' });
    
        AWSMock.restore('DynamoDB');
        
      });
      it('should mock deleteItem from DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);
       
        
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'deleteItem', (params, callback) => {
          console.log('DynamoDB', 'deleteItem', 'mock called')
          
          callback(null,{ message: 'Post deleted successfully' });
          
        
        });
        
        let input = { TableName: '', Key: {}}
            
        
        // When calling AWS.DynamoDB node.js will use the mocked object
        const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        
        const result = await dynamodb.deleteItem(input).promise();
        expect(result).to.eql({ message: 'Post deleted successfully' });
    
        AWSMock.restore('DynamoDB');
        
      });
      
       
      it('should mock listItem to DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);
       
        
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'scan', (params, callback) => {
          console.log('DynamoDB', 'scan', 'mock called')

          callback(null,testdata.response);
    
          
          
        });
        
        let input = { TableName: 'postsTable'}
            
        
        // When calling AWS.DynamoDB node.js will use the mocked object
        const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
        
        const result = await dynamodb.scan(input).promise();
    
        expect(result).to.eql(testdata.response);
        console.log(result);
    
        AWSMock.restore('DynamoDB');
       
        
      });
      
  });

