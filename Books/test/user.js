const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');
const { stringify } = require('uuid');
const expect = require('chai').expect;
//const testdata=require('./testcase');
const list=require('../src/handlers/getBook')
const assert = require('assert')
const getlist=require('../src/handlers/getBooks')
const deletepost=require('../src/handlers/deleteBook');
const putpost=require('../src/handlers/createBook')
const updatepost=require('../src/handlers/updateBook')
//const responseCode=require('../functions/index')
describe('the module', () => {
    it('should mock getItem from DynamoDB', async () => {
      AWSMock.setSDKInstance(AWS);   
     try{
      // Mocking DynamoDB.getItem()
      AWSMock.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
        console.log('DynamoDB', 'getItem', 'mock called')
        callback(null,testdata.response);
      })
           let event={
            pathParameters:{
              id:'6fdeaba0-9640-11ec-b9f9-01dccbd23345'  
            }        
           }
          process.env.DYNAMO_TABLE_NAME='PostsTable'
           const result= await list.getPost(event);
           console.log(result);
           console.log(testdata.response)
          //expect(result).to.be.equals(testdata.response) 
        expect (result.statusCode).to.equal(200);
          //result.expect(result.statuscode).to.eql(200)
         //assert.equal(result,testdata.response);
         //expect(result).to.eql(200);
         AWSMock.restore('DynamoDB'); 
     }catch(err){
       throw err;
     }
    })
      it('should mock listItem to DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'scan', (params, callback) => {
          console.log('DynamoDB', 'scan', 'mock called')
          callback(null,testdata.response);
        });
        const result = await getlist.listPosts(null);
       // expect(result.statuscode).to.be.equals(200)
        //expect(result.body).to.equal(testdata.response);
        expect (result.statusCode).to.equal(200)
        console.log(result);
        AWSMock.restore('DynamoDB'); 
      });
      it('should mock putpost from DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);    
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'put', (params, callback) => {
          console.log('DynamoDB', 'deleteItem', 'mock called')
          callback(null);
        });
        var event={    
          body:{    
        "postTitle":"behdb",
        "postBody":"hello",
        "imgUrl":"ehfjbcjdb",
        "tags":"hiii"  
          } 
        }
        const result = await putpost.createPost(event);
       // expect(result).to.eql({ message: 'Post deleted successfully' });
        expect (result.statusCode).to.equal(200);
        AWSMock.restore('DynamoDB'); 
      });
      it('should mock putpost from DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);      
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'update', (params, callback) => {
          console.log('DynamoDB', 'update', 'mock called')
          callback(null);
        });
        var event={    
          body:{    
          "postTitle":"third title",
           "postBody":"third post",
            "imgUrl":"third url", 
            "tags":"hellllloo", 
            "id":"39294990-93ba-11ec-a51c-8358767c527a"
          } 
        }
        const result = await updatepost.updatePost(event);
       // expect(result).to.eql({ message: 'Post deleted successfully' });
        expect (result.statusCode).to.equal(200);
        AWSMock.restore('DynamoDB'); 
      });
      it('should mock deletepost from DynamoDB', async () => {
        AWSMock.setSDKInstance(AWS);      
        // Mocking DynamoDB.getItem()
        AWSMock.mock('DynamoDB', 'delete', (params, callback) => {
          console.log('DynamoDB', 'delete', 'mock called')
          callback(null);
        });
        var event={    
          body:{    
            "id":"39294990-93ba-11ec-a51c-8358767c527a"
          } 
        }
        const result = await deletepost.deletePost(event);
        console.log(result)
       // expect(result).to.eql({ message: 'Post deleted successfully' });
        expect (result.statusCode).to.equal(200);
        AWSMock.restore('DynamoDB'); 
      });
  });

