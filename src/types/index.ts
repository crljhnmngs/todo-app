export type ButtonProps = {
    buttonType: 'Primary' | 'Secondary' | 'Danger';
    className?: string;
    onClick: () => void;
    children: React.ReactNode;
};
