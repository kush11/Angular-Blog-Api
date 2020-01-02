def defFunction():
    a=[]
    n= int(input('Enter the number of list element to be added'))
    for i in range(n):
        option= input('Enter the type of elements')
        if option == 'int':
            element = intFunc()
            a.append(element)
            print(a)
        elif option == 'float':
            element = floatFunc()
            a.append(element)
            print(a)
        elif option == 'bool':
            element = boolFunc()
            a.append(element)
            print(a)
        elif option == 'list':
            element = listFunc()
            a.append(element)
            print(a)
        else :
            element = input('Enter the element')
            a.append(element)
            print(a)

def intFunc():
    element = int(input('Enter the element'))
    element = element+1
    return element
def floatFunc():
    element = float(input('Enter the element'))    
    return element
def boolFunc():
    element = bool(input('Enter the element'))    
    return element  
def listFunc():    
    temp=[]
    n = int(input('Enter the number of element in the list'))
    for i in range(n):
        element = int(input('Enter the element'))
        temp.append(element)
    print(temp)
    return temp        
        
defFunction()