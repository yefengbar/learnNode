js并不脆弱，使用异常就能够保证线程永不崩溃。

js服务的稳定性从三方面保证：
* 使用异常机制捕捉异常
* 使用中间件
* 使用守护进程