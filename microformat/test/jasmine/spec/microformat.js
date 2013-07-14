describe("init-microformat", function() {
  it("should be able to render prop button", function() {

    var signal = 0;

    runs(function(){
      propularity.require(['app/startup'], function(mf){
        mf.init({
            host : 'http://alpha.propularity.com/'
        });

        signal++;
      });
    });

    waitsFor(function() { return signal; }, 5000);

    runs(function () {
      expect($('[data-propularity-model]').length).toEqual(1);
    });
  });
});