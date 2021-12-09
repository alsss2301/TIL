import { findAllByDisplayValue } from '@testing-library/dom';
import { useReducer, useEffect } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
              };
            case 'SUCCESS':
              return {
                loading: false,
                data: action.data,
                error: null
              };
            case 'ERROR':
              return {
                loading: false,
                data: null,
                error: action.error
              };
            default:
              throw new Error(`Unhandled action type: ${action.type}`);
          }
        }
        
        function useAsync(callback, deps = [], skip = false) {
          const [state, dispatch] = useReducer(reducer, {
            loading: false,
            data: null,
            error: false
          });
        
          const fetchData = async () => {
            dispatch({ type: 'LOADING' });
            try {
              const data = await callback();
              dispatch({ type: 'SUCCESS', data });
            } catch (e) {
              dispatch({ type: 'ERROR', error: e });
            }
          };
          //try/catch문법 : 에러가 발생 할 것 같은 코드를 try 로 감싸고 에러가 발생했을 때 catch 를 이용하여 예외처리를 한다.
          useEffect(() => {
            if (skip) return; //특정 버튼을 눌렀을때만 API를 호출하고 싶을때
            fetchData();
            // eslint 설정을 다음 줄에서만 비활성화
            // eslint-disable-next-line
          }, deps);//useAsyns 함수는 두가지 파라미터를 받아옴. 하나는 API요청을 시작하는 함수이고, 두번째는 deps인데 이 deps값은 해당 함수 안에서 사용하는 useEffect의 deps로 설정됨.
        
          return [state, fetchData];
        }
        
        export default useAsync;
