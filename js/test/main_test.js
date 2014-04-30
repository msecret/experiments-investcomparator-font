// Copyright (c) 2014
// All Rights Reserved
// https://github.com/msecret/experiments-investcomparator-front
// Licensed Apache

describe('invc.Main', function() {
  var Main;

  beforeEach(function() {
    var flag = false;

    require(['invc/main'], function(__Main) {
      Main = __Main;
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });
  });

  describe('properties', function() {
    it('should have a value property', function() {
      expect(Main.avalue).toEqual(1);
    });
  });
});
