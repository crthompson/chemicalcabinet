export function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Spinner() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" rx="16" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="black"
      />
    </svg>
  );
}

export function ChemicalLogo(props: React.SVGProps<SVGSVGElement>){
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      data-name="Слой 1" 
      viewBox="0 0 175.82993 294.998775" x="0px" y="0px">
        <title>Weber State Chemistry</title>
        <path d="M382.915,232.87457V191.45838a14.47456,14.47456,0,0,0-14.45789-14.45789H221.54293A14.47456,14.47456,0,0,0,207.085,191.45838v41.41619a14.47456,14.47456,0,0,0,14.45789,14.45789h14.71989a32.51216,32.51216,0,0,1-11.41164,11.10842A33.77638,33.77638,0,0,0,207.085,288.10531v97.54441a27.3809,27.3809,0,0,0,27.34979,27.34979H355.56517A27.3809,27.3809,0,0,0,382.915,385.64972V288.10531a33.77638,33.77638,0,0,0-17.76614-29.66443,32.463,32.463,0,0,1-11.4228-11.10842h14.731A14.47456,14.47456,0,0,0,382.915,232.87457Zm-11.722-41.41619v41.41619a2.7718,2.7718,0,0,1-2.7359,2.73589h-8.20539v-46.888h8.20539A2.7718,2.7718,0,0,1,371.193,191.45838Zm-39.66018,44.15208v-46.888h16.99689v46.888Zm-86.15667,0v-46.888H262.373v46.888Zm28.71889-46.888h16.9969v46.888H274.095Zm28.71889,0h16.99689v46.888H302.8139ZM218.807,232.87457V191.45838a2.7718,2.7718,0,0,1,2.7359-2.7359h12.1112v46.888h-12.1112A2.7718,2.7718,0,0,1,218.807,232.87457ZM359.558,268.74342a22.06809,22.06809,0,0,1,11.635,19.36189v80.15831H284.30368a5.861,5.861,0,1,0,0,11.722H371.193v5.66411a15.64512,15.64512,0,0,1-15.6278,15.6278H234.43483a15.64512,15.64512,0,0,1-15.6278-15.6278V288.10531a21.64767,21.64767,0,0,1,.17114-2.48176H306.722a5.861,5.861,0,0,0,0-11.722H224.11555a22.3729,22.3729,0,0,1,6.32648-5.15813c10.66412-5.785,16.59137-15.83214,19.2178-21.411h90.68034C342.9666,252.91128,348.89385,262.9584,359.558,268.74342Z" 
              transform="translate(-207.08504 -177.00049)"/>
        <text x="0" y="250.99902" fill="#000000" fontSize="5px" fontWeight="bold" fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Chintuza</text><text x="0" y="255.99902" fill="#000000" fontSize="5px" fontWeight="bold" fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text>
        </svg>
  )
}
