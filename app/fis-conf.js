// html文件发布到template目录
fis.media('qa').match('/app/page/(**/**.html)', {
    release: '/$1',
    deploy: fis.plugin('http-push', {
        receiver: fis.get('qa-upload'),
        to: fis.get('qa-template')
    })
});
fis.media('prod').match('/app/page/**/**.html', {
    release: '/template/$0',
    deploy: fis.plugin('http-push', {
        receiver: fis.get('prod-upload'),
        to: fis.get('prod-template')
    })
});
