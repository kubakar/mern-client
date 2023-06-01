import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Wrapper = styled.div``;

// const Wrapper = styled.section`
//   height: 6rem;
//   margin-top: 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: end;
//   flex-wrap: wrap;
//   gap: 1rem;
//   .btn-container {
//     background: var(--primary-100);
//     border-radius: var(--borderRadius);
//   }
//   .pageBtn {
//     background: transparent;
//     border-color: transparent;
//     width: 50px;
//     height: 40px;
//     font-weight: 700;
//     font-size: 1.25rem;
//     color: var(--primary-500);
//     transition: var(--transition);
//     border-radius: var(--borderRadius);
//     cursor: pointer;
//   }
//   .active {
//     background: var(--primary-500);
//     color: var(--white);
//   }
//   .prev-btn,
//   .next-btn {
//     width: 100px;
//     height: 40px;
//     background: var(--white);
//     border-color: transparent;
//     border-radius: var(--borderRadius);
//     color: var(--primary-500);
//     text-transform: capitalize;
//     letter-spacing: var(--letterSpacing);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5rem;
//     cursor: pointer;
//     transition: var(--transition);
//   }
//   .prev-btn:hover,
//   .next-btn:hover {
//     background: var(--primary-500);
//     color: var(--white);
//   }
// `

type Props = {
  pages: number;
  count: number;
  onPageChange: (newPage: number) => void;
};

const PageBtnContainer: React.FC<Props> = ({ pages, count, onPageChange }) => {
  const { jobFilterOptions } = useAppContext();

  const currentPage = jobFilterOptions.page ?? 1;

  // const [currentPage, setCurrentPage] = useState(jobFilterOptions.page ?? 1);

  return (
    <Wrapper>
      <div>Current page : {jobFilterOptions.page}</div>
      <div>Pages : {pages}</div>
      <div>{count}</div>
      <hr />
      {[...Array(pages).keys()].map((page) => {
        const humanizedPage = page + 1;

        return (
          <button
            key={page}
            style={{
              fontSize: "20px",
              padding: "10px",
              ...(currentPage === humanizedPage && { background: "lightblue" }),
            }}
            onClick={() => {
              // setCurrentPage(humanizedPage);
              onPageChange(humanizedPage);
            }}
          >
            page {humanizedPage}
          </button>
        );
      })}
    </Wrapper>
  );
};
export default PageBtnContainer;
