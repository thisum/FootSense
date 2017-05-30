var map = {
    'app': 'js/app',
    'rxjs': 'js/vendor/rxjs',
    '@angular': 'js/vendor/@angular',
    'ng2-bootstrap': 'js/vendor/ng2-bootstrap',
    'bootstrap': 'js/vendor/bootstrap',
    'moment': 'js/vendor/moment/moment.js',
    'mydatepicker': 'js/vendor/mydatepicker/bundles/mydatepicker.umd.js',
    'angular2-busy': 'js/vendor/angular2-busy/build/src/index.js'
};

var packages = {
    'app': { main: 'boot.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'ng2-bootstrap': { defaultExtension: 'js' },
    'bootstrap': { defaultExtension: 'js' },
    'angular2-busy': { defaultExtension: 'js' }
};

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/forms',
    '@angular/testing',
    '@angular/upgrade' 
];

packageNames.forEach(function(pkgName) {
   packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

var config = {
    map: map,
    packages: packages
};

System.config(config);