describe("Testing", function(){
  it("can do addition", function(){
    expect(1 + 1).to.equal(2)
  })
})

Ember.Test.adapter = Ember.Test.MochaAdapter.create();
App.setupForTesting();
App.injectTestHelpers();


rungify = function(original) {
  return function(fn) {
    if (fn.length) {
      return original(function(done) {
        return Ember.run((function(_this) {
          return function() {
            return fn.call(_this, done);
          };
        })(this));
      });
    } else {
      return original(function() {
        return Ember.run((function(_this) {
          return function() {
            return fn.call(_this);
          };
        })(this));
      });
    }
  };
};

this.beforeEach = rungify(this.beforeEach);

this.afterEach = rungify(this.afterEach);

describe("Index Page", function(){
  beforeEach(function(){
    visit('/posts')
  })

  it("has two posts", function(){
    console.log($('table'))
    expect($('#posts .post-link').length).to.equal(2);
  })
})