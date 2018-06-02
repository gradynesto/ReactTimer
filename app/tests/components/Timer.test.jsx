var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');


var Timer = require('Timer');

describe('Timer', () => {

    it('should exist', () => {
        expect(Timer).toExist();
    });


    describe('handleStatusChange', () => {
        it('should set state to paused by default and timer starts at 0', (done) =>{
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            
            expect(timer.state.count).toBe(0);
            expect(timer.state.timerStatus).toBe('paused');

            done();
        });

        it('should pause timer on paused state', (done)=> {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('paused');
                expect(timer.state.count).toBe(1);
                expect(timer.state.timerStatus).toBe('paused');
                done();
            }, 1001);

        });


        it('should reset timer if stopped', (done)=> {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('stopped');
                expect(timer.state.count).toBe(0);
                expect(timer.state.timerStatus).toBe('paused');
                done();
            }, 2001);


        });

/*         it('should resume timer on after pausing', (done)=> {
            var timer = TestUtils.renderIntoDocument(<Timer/>);
            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('paused');
            }, 1001);

            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('paused');
                expect(timer.state.count).toBe(2);
                done();
            }, 1001);


        }); */

    });

});