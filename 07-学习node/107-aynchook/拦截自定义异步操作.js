const fs = require('fs');
const asyncHooks = require('async_hooks');

class MyResource extends asyncHooks.AsyncResource {
    constructor() {
        super('my-resource');
    }

    asyncMethod(callback) {
        this.emitBefore();
        callback();
        this.emitAfter();
    }

    close() {
        this.emitDestroy();
    }
}

const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        fs.writeSync(1, `init: asyncId-${asyncId}, type-${type}, triggerAsyncId-${triggerAsyncId}\n`);
    },
    before(asyncId) {
        fs.writeSync(1, `before: asyncId-${asyncId}\n`);
    },
    after(asyncId) {
        fs.writeSync(1, `after: asyncId-${asyncId}\n`);
    },
    destroy(asyncId) {
        fs.writeSync(1, `destroy: asyncId-${asyncId}\n`);
    }
});

hook.enable();

let resource = new MyResource;
resource.asyncMethod(() => {
});
resource.close();

// hook.disable();    // 注意，这里不要disable，否则将不会触发destroy事件
