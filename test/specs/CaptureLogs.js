var fs = require('fs')
var assert = require('assert')
describe('Capture Network Logs', () => {
    //Example 1
    it('Capture All get calls', () => {

        var output = browser.mock('**',{method:'get'})
        browser.url('https://reqres.in')
        
        Object.keys(output.calls).forEach(function(key){
            console.log(output.calls[key].url)
            fs.writeFile(key+'.json', JSON.stringify(output.calls[key]), function(err){
                if(err) throw err;
            })
        })

    });

    //Example 2
    it('Capture All post calls', () => {

        var output = browser.mock('**',{method:'post'})
        browser.url('https://reqres.in')
        
        Object.keys(output.calls).forEach(function(key){
            console.log(output.calls[key].url)
            fs.writeFile(key+'.json', JSON.stringify(output.calls[key]), function(err){
                if(err) throw err;
            })
        })

    });

    //Example 3
    it('Capture a specific calls', () => {

        var output1 = browser.mock('**/login',{method:'post'})
        browser.url('https://the-internet.herokuapp.com/login')
        
        $('//*[@id="username"]').setValue('asdfasf')
        $('//*[@id="password"]').setValue('asfadsfasf')
        $('//*[@id="login"]/button').click()

        Object.keys(output1.calls).forEach(function(key){
            console.log(output1.calls[key].url)
            fs.writeFile('login.json', JSON.stringify(output1.calls[key]), function(err){
                if(err) throw err;
            })
        })

    });
    //Example 4
    it('Verify request data', () => {

        var output2 = browser.mock('**/authenticate',{method:'post'})
        browser.url('https://the-internet.herokuapp.com/login')
        
        $('//*[@id="username"]').setValue('asdfasf')
        $('//*[@id="password"]').setValue('asfadsfasf')
        $('//*[@id="login"]/button').click()

        $('//*[@id="username"]').setValue('4356426126')
        $('//*[@id="password"]').setValue('asfadsfasf')
        $('//*[@id="login"]/button').click()


        assert.strictEqual(output2.calls[0].postData, 'username=asdfasf&password=asfadsfasf')
        assert.strictEqual(output2.calls[1].postData, 'username=asdfasf&password=asfadsfasf')

    });

    // $('//*[@data-id="users-single"]/a').scrollIntoView()
    // $('//*[@data-id="users-single"]/a').click()  

    it('Verify response data', () => {

        var output3 = browser.mock('**/api/users/2',{method:'get'})
        browser.url('https://reqres.in')
        
        $('//*[@data-id="users-single"]/a').scrollIntoView()
        $('//*[@data-id="users-single"]/a').click()  

        Object.keys(output3.calls).forEach(function(key){
            console.log(output3.calls[key].url)
            fs.writeFile('getUser.json', JSON.stringify(output3.calls[key]), function(err){
                if(err) throw err;
            })
        })

        assert.strictEqual(output1.calls[0].body.data.email, 'janet.weaver@reqres.in')
        

    });
    
});


