# @blb-ventures/react-hooks

This repo contains a collection of commonly used react hooks

## Installation

```sh
<<<<<<< HEAD
npm install @blb-ventures/react-hooks       # npm
yarn add @blb-ventures/react-hooks          # yarn
bun add @blb-ventures/react-hooks           # bun
pnpm add @blb-ventures/react-hooks          # pnpm
=======
npm install zod       # npm
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm
>>>>>>> 8ee7f60ab7dd3ffcb97d26248cfc4dce672fb7b6
```

## Hooks

### Use Dialogs

An alias for Use Dynamic Load


### Use Dynamic Load

Use to manage a list of components that can be dynamically loaded and which one is currently opened

#### Usage

```ts
type Dialogs = 'createUser' | 'updateUser';

const Component: FC = () => {
  const dialogs = useDialogs<Dialogs>();
  return (
    <div>
      <button onClick={dialogs.handleOenDialog('createUser')}>Create User</button>
      <button onClick={dialogs.handleOenDialog('updateUser')}>Update User</button>
      {dialogs.load.createUser && (
        <CreateUserDialog open={dialogs.open === 'createUser'} onClose={dialogs.handleCloseDialog}>
      )}
      {dialogs.load.updateUser && (
        <UpdateUserDialog open={dialogs.open === 'updateUser'} onClose={dialogs.handleCloseDialog}>
      )}
    </div>
  )
}
```

### Use Event

Use to subscribe to a HTMLElement event it returns the event data and can also trigger a callback, also unsubscribes from the event on unmount

#### Usage

```ts
interface ProgressData {
  progress: number;
}

class Progress extends EventTarget {
  progress: number = 0;

  constructor() {
    super();
  }

  setProgress(newProgress: number) {
    this.progress = newProgress;
    this.dispatchEvent(new CustomEvent<ProgressData>('progress', {
      detail: {
        progress: this.progress
      }
    }))
  }
}

const progressInstance = new Progress();

const Component: FC = () => {
  const progress = useEvent<ProgressData>(progressInstance, 'progress');
  return (<div>
    <button onClick={() => {progressInstance.setProgress(0.5)}}>Set progress to 0.5</button>
    <span>Current progress {progress}</span>
  </div>);
};
```

### Use Polling

Use to call a function in a set interval

#### Usage

```ts
const Component: FC = () => {
  const [value, setValue] = useState<number>(0);
  const progress = usePolling({
    fn: () => {
      setValue(Math.random()*100)
    },
    intervalMs: 500,
    autoStart: true
  });
  return (<div>
    <span>Current value {value}</span>
  </div>);
};
```

### Use Resize Observer

Use to watch a size change on any element

#### Usage

```ts
const Component: FC = () => {
  const ref = useRef();
  const [refWidth, setRefWidth] = useState(0);
  useResizeObserver(
    ref,
    w => {
      setRefWidth(w ?? 20);
    }
  );
  return (<div>
    <div ref={ref}></div>
    <p>Current div width: {refWidth}</p>
  </div>);
};
```

### Use Window Size

Use to watch a size change on the browser window

#### Usage

```ts
const Component: FC = () => {
  const widowSize = useWindowSize();
  return (<div>
    <p>Current window width: {windowSize.width}</p>
    <p>Current window height: {windowSize.height}</p>
  </div>);
};
```
