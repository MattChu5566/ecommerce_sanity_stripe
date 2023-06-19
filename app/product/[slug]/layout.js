import { Suspense } from "react";
import { Loading } from '../../../components/index'

export default function Layout({children, modal}) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
      {modal}
    </div>
  )
}
