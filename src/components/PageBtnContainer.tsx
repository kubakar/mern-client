import styled from "styled-components";

// const Wrapper = styled.div``;

const Wrapper = styled.section`
  height: 4rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-wrap: wrap; */
  gap: 1rem;

  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 50px;
    font-weight: 700;
    /* font-size: 1.25rem; */
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 50px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;

type Props = {
  apiPage: number | null;
  pages: number;
  onPageChange: (newPage: number) => void;
};

const PageBtnContainer: React.FC<Props> = ({
  pages,
  onPageChange,
  apiPage,
}) => {
  const currentPage = apiPage ?? 1;

  // const [currentPage, setCurrentPage] = useState(jobFilterOptions.page ?? 1);
  const changePage = (next: boolean) => {
    if (!next && currentPage <= 1) return;
    if (next && currentPage >= pages) return;
    onPageChange(currentPage + (next ? 1 : -1));
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={() => changePage(false)}>
        Previous
      </button>
      <div className="btn-container">
        {[...Array(pages).keys()].map((page) => {
          const humanizedPage = page + 1;

          return (
            <button
              key={page}
              className={`pageBtn ${currentPage === humanizedPage && "active"}`}
              onClick={() => {
                // setCurrentPage(humanizedPage);
                onPageChange(humanizedPage);
              }}
            >
              {humanizedPage}
            </button>
          );
        })}
      </div>
      <button className="prev-btn" onClick={() => changePage(true)}>
        Next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
