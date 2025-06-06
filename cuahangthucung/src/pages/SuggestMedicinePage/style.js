import styled from 'styled-components';

export const SuggestMedicineContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
`;

export const SuggestMedicineTitle = styled.h2`
  color: #1976d2;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const SuggestMedicineButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
`;

export const SuggestMedicineButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #125ea2;
  }
`;

export const SuggestMedicineResultTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 18px;
`;

export const SuggestMedicineList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const NoResult = styled.div`
  color: #d32f2f;
  font-size: 1.1rem;
  margin-top: 12px;
`;
