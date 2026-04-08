# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


    
  const searchTerm = useSelector((state) => state.filter.searchTerm);
 
  // Mock Data (Later this will come from Appwrite service.getProducts())
  const [orders, setOrders] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.$id) {
      // Fetch orders where the userId matches the logged-in user
      service.getOrders(userData.$id).then((response) => {
        if (response) {
          setOrders(response.documents);
        }
      });
    }
  }, [userData]);